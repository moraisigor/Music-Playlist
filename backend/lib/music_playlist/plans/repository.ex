defmodule MusicPlaylist.Plans.Plan.Repository do
  @moduledoc """
  The Plans context.
  """

  import Ecto.Query, warn: false
  alias MusicPlaylist.Repo

  alias MusicPlaylist.Plans.Plan

  @doc """
  Returns the list of plans.

  ## Examples

      iex> list_plans()
      [%Plan{}, ...]

  """
  def list_all_plans do
    Repo.all(Plan)
  end

  @doc """
  Returns the list of plans paginated.

  ## Examples

      iex> list_plans(1, 10)
      [%Plan{}, ...]

  """
  def list_plans(page, plans_per_page) do
    offset = (page - 1) * plans_per_page

    from(plan in Plan)
    |> limit(^plans_per_page)
    |> offset(^offset)
    |> Repo.all()
  end

  @doc """
  Returns the number of plans.

  ## Examples

      iex> count_plans()
      10

  """
  def count_plans() do
    from(plan in Plan)
    |> Repo.aggregate(:count, :id)
  end

  @doc """
  Gets a single plan.

  Raises `Ecto.NoResultsError` if the Plan does not exist.

  ## Examples

      iex> get_plan!(123)
      %Plan{}

      iex> get_plan!(456)
      ** (Ecto.NoResultsError)

  """
  def get_plan!(id), do: Repo.get!(Plan, id)

  @doc """
  Gets a single plan by name.

  Raises `Ecto.NoResultsError` if the Plan does not exist.

  ## Examples

      iex> get_plan!(123)
      %Plan{}

      iex> get_plan!(456)
      ** (Ecto.NoResultsError)

  """
  def get_plan_by_name(name), do: Repo.get_by(Plan, name: name)

  @doc """
  Creates a plan.

  ## Examples

      iex> create_plan(%{field: value})
      {:ok, %Plan{}}

      iex> create_plan(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_plan(attrs \\ %{}) do
    %Plan{}
    |> Plan.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a plan.

  ## Examples

      iex> update_plan(plan, %{field: new_value})
      {:ok, %Plan{}}

      iex> update_plan(plan, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_plan(%Plan{} = plan, attrs) do
    plan
    |> Plan.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a plan.

  ## Examples

      iex> delete_plan(plan)
      {:ok, %Plan{}}

      iex> delete_plan(plan)
      {:error, %Ecto.Changeset{}}

  """
  def delete_plan(%Plan{} = plan) do
    Repo.delete(plan)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking plan changes.

  ## Examples

      iex> change_plan(plan)
      %Ecto.Changeset{data: %Plan{}}

  """
  def change_plan(%Plan{} = plan, attrs \\ %{}) do
    Plan.changeset(plan, attrs)
  end
end
