defmodule MusicPlaylist.Repo.Migrations.CreateClients do
  use Ecto.Migration

  def change do
    create table(:clients, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :email, :string
      add :password_hash, :string
      add :plan_id, references(:plans, on_delete: :nothing, type: :binary_id)

      timestamps()
    end

    create unique_index(:clients, [:email])
    create index(:clients, [:plan_id])
  end
end
