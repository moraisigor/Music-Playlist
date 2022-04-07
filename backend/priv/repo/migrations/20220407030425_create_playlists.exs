defmodule MusicPlaylist.Repo.Migrations.CreatePlaylists do
  use Ecto.Migration

  def change do
    create table(:playlists, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :client_id, references(:clients, on_delete: :delete_all, type: :binary_id)
      add :music_id, references(:musics, on_delete: :delete_all, type: :binary_id)

      timestamps()
    end

    create index(:playlists, [:client_id])
    create index(:playlists, [:music_id])
    create unique_index(:playlists, [:music_id, :client_id], name: :music_playlist_uniqueness)
  end
end
