defmodule MusicPlaylist.Accounts.Admin do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "admins" do
    field :email, :string, null: false, blank: false
    field :password_hash, :string, null: false, blank: false
    field :password, :string, virtual: true

    timestamps()
  end

  @doc false
  def changeset(client, attrs) do
    client
    |> cast(attrs, [:email, :password])
    |> validate_format(:email, ~r/@/)
    |> unique_constraint(:email)
    |> validate_password()
    |> put_password_hash()
    |> validate_required([:email, :password_hash])
  end

  defp validate_password(changeset) do
    changeset
    |> validate_length(:password, min: 8)
    |> validate_format(:password, ~r/[0-9]+/, message: "Password must contain a number")
    |> validate_format(:password, ~r/[A-Z]+/, message: "Password must contain an upper-case letter")
    |> validate_format(:password, ~r/[a-z]+/, message: "Password must contain a lower-case letter")
  end

  defp put_password_hash(changeset) do
    IO.inspect(changeset)
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: password}} ->
        put_change(changeset, :password_hash, Argon2.hash_pwd_salt(password))
      _ ->
        changeset
    end
  end
end
