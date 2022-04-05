alias MusicPlaylist.Plans.{Plan, PlanHierarchy}


{:ok, gold} = %{
  name: "Gold",
  music_limit: 5
} |> Plan.Repository.create_plan()

{:ok, basic} = %{
  name: "Basic",
  music_limit: 3
} |> Plan.Repository.create_plan()

%{
  child_id: gold.id
} |> PlanHierarchy.Repository.create_plan_hierarchy()

%{
  child_id: basic.id,
  parent_id: gold.id
} |> PlanHierarchy.Repository.create_plan_hierarchy()
