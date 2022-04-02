defmodule MusicPlaylist.Accounts.Admin do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "admins" do
    field :email, :string, null: false, blank: false
    field :password_hash, :string, null: false, blank: false
    field :password, :string

    timestamps()
  end

  @doc false
  def changeset(admin, attrs) do
    admin
    |> cast(attrs, [:email, :password_hash])
    |> validate_required([:email, :password_hash])
    |> unique_constraint(:email)
  end
end
