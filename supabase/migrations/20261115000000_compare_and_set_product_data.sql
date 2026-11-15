-- Apply in Supabase before deploying the matching admin UI.
-- SECURITY INVOKER deliberately retains the caller's table privileges and RLS.
create or replace function public.compare_and_set_product_data(expected_data jsonb, new_data jsonb)
returns boolean
language plpgsql
security invoker
set search_path = public
as $$
declare affected integer;
begin
  if expected_data is null then
    insert into public.settings (id, data) values ('productData', new_data)
    on conflict (id) do nothing;
  else
    update public.settings set data = new_data
    where id = 'productData' and data::jsonb = expected_data;
  end if;
  get diagnostics affected = row_count;
  return affected = 1;
end;
$$;
revoke all on function public.compare_and_set_product_data(jsonb, jsonb) from public, anon;
grant execute on function public.compare_and_set_product_data(jsonb, jsonb) to authenticated;
