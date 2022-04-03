defmodule MusicPlaylist.Plans.Plan do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "plans" do
    field :active, :boolean, default: true
    field :image_url, :string, default: ""
    field :music_limit, :integer
    field :name, :string

    timestamps()
  end

  @doc false
  def changeset(plan, attrs) do
    plan
    |> cast(attrs, [:name, :music_limit, :active, :image_url])
    |> validate_required([:name, :music_limit])
    |> unique_constraint(:name)
  end
end
