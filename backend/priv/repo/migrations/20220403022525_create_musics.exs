defmodule MusicPlaylist.Repo.Migrations.CreateMusics do
  use Ecto.Migration

  def change do
    create table(:musics, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string, null: false, blank: false
      add :image_url, :string, null: false, default: ""
      add :active, :boolean, default: true, null: false

      timestamps()
    end
  end
end
