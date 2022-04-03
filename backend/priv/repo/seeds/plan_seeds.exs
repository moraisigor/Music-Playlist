alias MusicPlaylist.Plans.Plan.Repository

%{
  name: "Basic",
  music_limit: 3
} |> Repository.create_plan()

%{
  name: "Gold",
  music_limit: 5
} |> Repository.create_plan()
