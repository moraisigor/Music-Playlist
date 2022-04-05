defmodule MusicPlaylist.Repo.Migrations.CreateMusicPlans do
  use Ecto.Migration

  def change do
    create table(:music_plans, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :music_id, references(:musics, on_delete: :nothing, type: :binary_id)
      add :plan_id, references(:plans, on_delete: :nothing, type: :binary_id)

      timestamps()
    end

    create index(:music_plans, [:music_id])
    create index(:music_plans, [:plan_id])
    create unique_index(:music_plans, [:music_id, :plan_id], name: :music_plan_uniqueness)
  end
end
