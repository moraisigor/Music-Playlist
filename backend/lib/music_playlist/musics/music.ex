defmodule MusicPlaylist.Musics.Music do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "musics" do
    field :active, :boolean, default: true
    field :image_url, :string, null: false, default: ""
    field :name, :string, null: false

    timestamps()
  end

  @doc false
  def changeset(music, attrs) do
    music
    |> cast(attrs, [:name, :image_url, :active])
    |> validate_required([:name])
  end
end
