defmodule MusicPlaylist.Musics.MusicPlan do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "music_plans" do

    field :music_id, :binary_id
    field :plan_id, :binary_id

    timestamps()
  end

  @doc false
  def changeset(music_plan, attrs) do
    music_plan
    |> cast(attrs, [:music_id, :plan_id])
    |> validate_required([:music_id, :plan_id])
    |> unique_constraint(:music_plan_constraint, name: :music_plan_uniqueness)
  end
end
