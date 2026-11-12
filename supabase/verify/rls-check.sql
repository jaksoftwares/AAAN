-- AAAN website: security check for the form tables.
-- Run in the Supabase SQL Editor after 20261112000000_public_forms.sql.
-- Expected result: every row shows rls_enabled = true and anon_privileges = none.

select
  c.relname                                   as table_name,
  c.relrowsecurity                            as rls_enabled,
  case
    when has_table_privilege('anon', c.oid, 'SELECT,INSERT,UPDATE,DELETE')
      or has_table_privilege('authenticated', c.oid, 'SELECT,INSERT,UPDATE,DELETE')
    then 'EXPOSED'
    else 'none'
  end                                         as anon_privileges
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public'
  and c.relname in ('enquiries', 'farmer_signups', 'newsletter_subscribers')
order by c.relname;

-- Expected: three rows, rls_enabled = true, anon_privileges = none.
-- If anon_privileges shows EXPOSED, re-run the revoke statements at the end of the migration.
