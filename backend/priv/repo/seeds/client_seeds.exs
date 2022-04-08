alias MusicPlaylist.Accounts.Clients.Client.Repository
alias MusicPlaylist.Plans.Plan

basic = Plan.Repository.get_plan_by_name("Basic")
gold = Plan.Repository.get_plan_by_name("Gold")

%{
  email: "basic@email.com",
  password: "P4ssw0rd",
  plan_id: basic.id
} |> Repository.create_client()

%{
  email: "gold@email.com",
  password: "P4ssw0rd",
  plan_id: gold.id
} |> Repository.create_client()
