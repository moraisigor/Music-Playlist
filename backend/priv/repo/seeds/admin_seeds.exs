alias MusicPlaylist.Accounts.Admin.Repository

%{
  email: "admin@email.com",
  password: "P4ssw0rd"
} |> Repository.create_admin()
