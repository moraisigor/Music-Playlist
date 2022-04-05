defmodule MusicPlaylist.Plans.PlanHierarchy do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "plan_hierarchies" do

    field :child_id, :binary_id
    field :parent_id, :binary_id, null: true

    timestamps()
  end

  @doc false
  def changeset(plan_hierarchy, attrs) do
    plan_hierarchy
    |> cast(attrs, [:child_id, :parent_id])
    |> validate_required([:child_id])
    |> unique_constraint(:child_id)
  end
end
