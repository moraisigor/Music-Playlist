defmodule MusicPlaylist.Repo.Migrations.CreatePlans do
  use Ecto.Migration

  def change do
    create table(:plans, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string, null: false, blank: false
      add :music_limit, :integer, null: false, default: 0
      add :active, :boolean, default: true, null: false
      add :image_url, :string, null: false, blank: true, default: ""

      timestamps()
    end

    create unique_index(:plans, [:name])
  end
end
