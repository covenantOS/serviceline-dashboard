-- ServiceLine Lead Generation Dashboard
-- Database Schema for Supabase

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Leads table
create table if not exists leads (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  company text,
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'proposal', 'won', 'lost')),
  source text not null,
  campaign_id uuid references campaigns(id) on delete set null,
  value numeric(10, 2),
  notes text
);

-- Campaigns table
create table if not exists campaigns (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  description text,
  status text not null default 'active' check (status in ('active', 'paused', 'completed')),
  budget numeric(10, 2),
  start_date date,
  end_date date,
  leads_count integer default 0 not null
);

-- Lead Activities table
create table if not exists lead_activities (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  lead_id uuid references leads(id) on delete cascade not null,
  activity_type text not null check (activity_type in ('email', 'call', 'meeting', 'note', 'status_change')),
  description text not null,
  user_name text
);

-- Indexes for better query performance
create index if not exists leads_email_idx on leads(email);
create index if not exists leads_status_idx on leads(status);
create index if not exists leads_campaign_id_idx on leads(campaign_id);
create index if not exists leads_created_at_idx on leads(created_at);
create index if not exists campaigns_status_idx on campaigns(status);
create index if not exists lead_activities_lead_id_idx on lead_activities(lead_id);
create index if not exists lead_activities_created_at_idx on lead_activities(created_at);

-- Function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Triggers to automatically update updated_at
create trigger update_leads_updated_at
  before update on leads
  for each row
  execute function update_updated_at_column();

create trigger update_campaigns_updated_at
  before update on campaigns
  for each row
  execute function update_updated_at_column();

-- Function to update campaign leads count
create or replace function update_campaign_leads_count()
returns trigger as $$
begin
  if TG_OP = 'INSERT' then
    if new.campaign_id is not null then
      update campaigns
      set leads_count = leads_count + 1
      where id = new.campaign_id;
    end if;
  elsif TG_OP = 'UPDATE' then
    if old.campaign_id is distinct from new.campaign_id then
      if old.campaign_id is not null then
        update campaigns
        set leads_count = leads_count - 1
        where id = old.campaign_id;
      end if;
      if new.campaign_id is not null then
        update campaigns
        set leads_count = leads_count + 1
        where id = new.campaign_id;
      end if;
    end if;
  elsif TG_OP = 'DELETE' then
    if old.campaign_id is not null then
      update campaigns
      set leads_count = leads_count - 1
      where id = old.campaign_id;
    end if;
  end if;
  return coalesce(new, old);
end;
$$ language plpgsql;

-- Trigger to update campaign leads count
create trigger update_campaign_leads_count_trigger
  after insert or update or delete on leads
  for each row
  execute function update_campaign_leads_count();

-- Enable Row Level Security (RLS)
alter table leads enable row level security;
alter table campaigns enable row level security;
alter table lead_activities enable row level security;

-- Create policies (adjust based on your authentication setup)
-- For now, allowing all operations for authenticated users
create policy "Enable all operations for authenticated users" on leads
  for all using (true) with check (true);

create policy "Enable all operations for authenticated users" on campaigns
  for all using (true) with check (true);

create policy "Enable all operations for authenticated users" on lead_activities
  for all using (true) with check (true);

-- Insert sample data (optional)
insert into campaigns (name, description, status, budget, start_date) values
  ('Q1 2026 Digital Campaign', 'Focus on digital marketing channels', 'active', 50000.00, '2026-01-01'),
  ('Partner Referral Program', 'Lead generation through partner network', 'active', 25000.00, '2026-01-15'),
  ('Trade Show 2026', 'Annual industry trade show', 'paused', 75000.00, '2026-03-01');

insert into leads (first_name, last_name, email, phone, company, status, source, value, notes) values
  ('John', 'Doe', 'john.doe@example.com', '555-0123', 'Acme Corp', 'qualified', 'Website', 15000.00, 'Interested in enterprise plan'),
  ('Jane', 'Smith', 'jane.smith@example.com', '555-0124', 'Tech Solutions', 'contacted', 'Referral', 25000.00, 'Following up next week'),
  ('Bob', 'Johnson', 'bob.j@example.com', '555-0125', 'Digital Inc', 'new', 'LinkedIn', 10000.00, NULL),
  ('Alice', 'Williams', 'alice.w@example.com', '555-0126', 'Marketing Pro', 'proposal', 'Website', 30000.00, 'Sent proposal on 2026-01-15'),
  ('Charlie', 'Brown', 'charlie.b@example.com', '555-0127', 'Sales Corp', 'won', 'Referral', 45000.00, 'Deal closed!');
