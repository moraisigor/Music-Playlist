defmodule MusicPlaylist.Musics.MusicPlan.Repository do
  @moduledoc """
  The Musics context.
  """

  import Ecto.Query, warn: false
  alias MusicPlaylist.Repo

  alias MusicPlaylist.Musics.MusicPlan

  @doc """
  Returns the list of music_plans.

  ## Examples

      iex> list_music_plans()
      [%MusicPlan{}, ...]

  """
  def list_music_plans do
    Repo.all(MusicPlan)
  end

  @doc """
  Returns the list of music_plans.

  ## Examples

      iex> list_music_plans()
      [%MusicPlan{}, ...]

  """
  def list_music_plans_by_music(music_id) do
    MusicPlan
    |> where(music_id: ^music_id)
    |> Repo.all()
  end

  @doc """
  Gets a single music_plan.

  Raises `Ecto.NoResultsError` if the Music plan does not exist.

  ## Examples

      iex> get_music_plan!(123)
      %MusicPlan{}

      iex> get_music_plan!(456)
      ** (Ecto.NoResultsError)

  """
  def get_music_plan!(id), do: Repo.get!(MusicPlan, id)

  @doc """
  Creates a music_plan.

  ## Examples

      iex> create_music_plan(%{field: value})
      {:ok, %MusicPlan{}}

      iex> create_music_plan(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_music_plan(attrs \\ %{}) do
    %MusicPlan{}
    |> MusicPlan.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a music_plan.

  ## Examples

      iex> update_music_plan(music_plan, %{field: new_value})
      {:ok, %MusicPlan{}}

      iex> update_music_plan(music_plan, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_music_plan(%MusicPlan{} = music_plan, attrs) do
    music_plan
    |> MusicPlan.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a music_plan.

  ## Examples

      iex> delete_music_plan(music_plan)
      {:ok, %MusicPlan{}}

      iex> delete_music_plan(music_plan)
      {:error, %Ecto.Changeset{}}

  """
  def delete_music_plan(%MusicPlan{} = music_plan) do
    Repo.delete(music_plan)
  end

  @doc """
  Deletes all music_plan from music.

  ## Examples

      iex> delete_music_plan_by(music_plan)
      {:ok, %MusicPlan{}}

      iex> delete_music_plan_by(music_plan)
      {:error, %Ecto.Changeset{}}

  """
  def delete_music_plan_by(music_id) do
    MusicPlan
    |> where(music_id: ^music_id)
    |> Repo.delete_all()
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking music_plan changes.

  ## Examples

      iex> change_music_plan(music_plan)
      %Ecto.Changeset{data: %MusicPlan{}}

  """
  def change_music_plan(%MusicPlan{} = music_plan, attrs \\ %{}) do
    MusicPlan.changeset(music_plan, attrs)
  end
end
