defmodule MusicPlaylist.Repo.Migrations.CreatePlanHierarchies do
  use Ecto.Migration

  def change do
    create table(:plan_hierarchies, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :child_id, references(:plans, on_delete: :delete_all, type: :binary_id)
      add :parent_id, references(:plans, on_delete: :nothing, type: :binary_id), null: true

      timestamps()
    end

    create unique_index(:plan_hierarchies, [:child_id])
    create index(:plan_hierarchies, [:parent_id])
  end
end
