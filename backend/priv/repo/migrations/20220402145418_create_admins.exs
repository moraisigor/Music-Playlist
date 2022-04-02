defmodule MusicPlaylist.Repo.Migrations.CreateAdmins do
  use Ecto.Migration

  def change do
    create table(:admins, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :email, :string, null: false, blank: false
      add :password_hash, :string, null: false, blank: false

      timestamps()
    end

    create unique_index(:admins, [:email])
  end
end
