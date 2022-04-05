defmodule MusicPlaylist.Plans.PlanHierarchy.Repository do
  @moduledoc """
  The Plans context.
  """

  import Ecto.Query, warn: false
  alias MusicPlaylist.Repo

  alias MusicPlaylist.Plans.PlanHierarchy

  @doc """
  Returns the list of plan_hierarchies.

  ## Examples

      iex> list_plan_hierarchies()
      [%PlanHierarchy{}, ...]

  """
  def list_plan_hierarchies do
    Repo.all(PlanHierarchy)
  end

  @doc """
  Gets a single plan_hierarchy.

  Raises `Ecto.NoResultsError` if the Plan hierarchy does not exist.

  ## Examples

      iex> get_plan_hierarchy!(123)
      %PlanHierarchy{}

      iex> get_plan_hierarchy!(456)
      ** (Ecto.NoResultsError)

  """
  def get_plan_hierarchy!(id), do: Repo.get!(PlanHierarchy, id)

  @doc """
  Gets a single plan_hierarchy by child id.

  Raises `Ecto.NoResultsError` if the Plan hierarchy does not exist.

  ## Examples

      iex> get_plan_hierarchy!("id")
      %PlanHierarchy{}

      iex> get_plan_hierarchy!("no_id")
      ** (Ecto.NoResultsError)

  """
  def get_plan_hierarchy_by_child!(child_id), do: Repo.get_by!(PlanHierarchy, child_id: child_id)

  @doc """
  Creates a plan_hierarchy with parent_id.
  Raise error if parent given is already child of the given child_id.

  ## Examples

      iex> create_plan_hierarchy(%{field: value})
      {:ok, %PlanHierarchy{}}

      iex> create_plan_hierarchy(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_plan_hierarchy(%{child_id: child, parent_id: parent} = attrs) do
    case Repo.get_by(PlanHierarchy, [child_id: parent, parent_id: child]) do
      nil ->
        %PlanHierarchy{}
        |> PlanHierarchy.changeset(attrs)
        |> Repo.insert()

      _ ->
        {:error, %Ecto.Changeset{}}
    end
  end

  def create_plan_hierarchy(attrs) do
    %PlanHierarchy{}
    |> PlanHierarchy.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a plan_hierarchy.

  ## Examples

      iex> update_plan_hierarchy(plan_hierarchy, %{field: new_value})
      {:ok, %PlanHierarchy{}}

      iex> update_plan_hierarchy(plan_hierarchy, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_plan_hierarchy(%PlanHierarchy{} = plan_hierarchy, attrs) do
    plan_hierarchy
    |> PlanHierarchy.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a plan_hierarchy.

  ## Examples

      iex> delete_plan_hierarchy(plan_hierarchy)
      {:ok, %PlanHierarchy{}}

      iex> delete_plan_hierarchy(plan_hierarchy)
      {:error, %Ecto.Changeset{}}

  """
  def delete_plan_hierarchy(%PlanHierarchy{} = plan_hierarchy) do
    Repo.delete(plan_hierarchy)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking plan_hierarchy changes.

  ## Examples

      iex> change_plan_hierarchy(plan_hierarchy)
      %Ecto.Changeset{data: %PlanHierarchy{}}

  """
  def change_plan_hierarchy(%PlanHierarchy{} = plan_hierarchy, attrs \\ %{}) do
    PlanHierarchy.changeset(plan_hierarchy, attrs)
  end
end
