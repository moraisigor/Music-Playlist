alias MusicPlaylist.Musics.{Music, MusicPlan}
alias MusicPlaylist.Plans.Plan

basic = Plan.Repository.get_plan_by_name("Basic")
gold = Plan.Repository.get_plan_by_name("Gold")

# --------------------
{:ok, orient} = %{
  name: "Orient"
} |> Music.Repository.create_music()

%{
  music_id: orient.id,
  plan_id: basic.id
} |> MusicPlan.Repository.create_music_plan()

%{
  music_id: orient.id,
  plan_id: gold.id
} |> MusicPlan.Repository.create_music_plan()

# --------------------

{:ok, chiptune} = %{
  name: "Chiptune"
} |> Music.Repository.create_music()

%{
  music_id: chiptune.id,
  plan_id: gold.id
} |> MusicPlan.Repository.create_music_plan()

# --------------------

{:ok, edm} = %{
  name: "EDM"
} |> Music.Repository.create_music()

%{
  music_id: edm.id,
  plan_id: basic.id
} |> MusicPlan.Repository.create_music_plan()

%{
  music_id: edm.id,
  plan_id: gold.id
} |> MusicPlan.Repository.create_music_plan()

# --------------------

{:ok, chillout} = %{
  name: "Chillout"
} |> Music.Repository.create_music()

%{
  music_id: chillout.id,
  plan_id: gold.id
} |> MusicPlan.Repository.create_music_plan()

# --------------------

{:ok, dubstep} = %{
  name: "Dubstep"
} |> Music.Repository.create_music()

%{
  music_id: dubstep.id,
  plan_id: gold.id
} |> MusicPlan.Repository.create_music_plan()

# --------------------

{:ok, winter} = %{
  name: "Winter"
} |> Music.Repository.create_music()

%{
  music_id: winter.id,
  plan_id: basic.id
} |> MusicPlan.Repository.create_music_plan()

%{
  music_id: winter.id,
  plan_id: gold.id
} |> MusicPlan.Repository.create_music_plan()

# --------------------

{:ok, summer} = %{
  name: "Summer"
} |> Music.Repository.create_music()

%{
  music_id: summer.id,
  plan_id: basic.id
} |> MusicPlan.Repository.create_music_plan()

%{
  music_id: summer.id,
  plan_id: gold.id
} |> MusicPlan.Repository.create_music_plan()

# --------------------

{:ok, ocarina} = %{
  name: "Ocarina"
} |> Music.Repository.create_music()

%{
  music_id: ocarina.id,
  plan_id: gold.id
} |> MusicPlan.Repository.create_music_plan()
