defmodule MusicPlaylist.Musics.Music.Repository do
  @moduledoc """
  The Musics context.
  """

  import Ecto.Query, warn: false
  alias MusicPlaylist.Repo

  alias MusicPlaylist.Musics.Music

  @doc """
  Returns the list of musics.

  ## Examples

      iex> list_musics()
      [%Music{}, ...]

  """
  def list_all_musics do
    Repo.all(Music)
  end

  @doc """
  Returns the list of musics paginated.

  ## Examples

      iex> list_musics(1, 10)
      [%Plan{}, ...]

  """
  def list_musics(page, musics_per_page) do
    offset = (page - 1) * musics_per_page

    from(music in Music)
    |> limit(^musics_per_page)
    |> offset(^offset)
    |> Repo.all()
  end

  @doc """
  Returns the number of musics.

  ## Examples

      iex> count_musics()
      10

  """
  def count_musics() do
    from(music in Music)
    |> Repo.aggregate(:count, :id)
  end

  @doc """
  Gets a single music.

  Raises `Ecto.NoResultsError` if the Music does not exist.

  ## Examples

      iex> get_music!(123)
      %Music{}

      iex> get_music!(456)
      ** (Ecto.NoResultsError)

  """
  def get_music!(id), do: Repo.get!(Music, id)

  @doc """
  Creates a music.

  ## Examples

      iex> create_music(%{field: value})
      {:ok, %Music{}}

      iex> create_music(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_music(attrs \\ %{}) do
    %Music{}
    |> Music.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a music.

  ## Examples

      iex> update_music(music, %{field: new_value})
      {:ok, %Music{}}

      iex> update_music(music, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_music(%Music{} = music, attrs) do
    music
    |> Music.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a music.

  ## Examples

      iex> delete_music(music)
      {:ok, %Music{}}

      iex> delete_music(music)
      {:error, %Ecto.Changeset{}}

  """
  def delete_music(%Music{} = music) do
    Repo.delete(music)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking music changes.

  ## Examples

      iex> change_music(music)
      %Ecto.Changeset{data: %Music{}}

  """
  def change_music(%Music{} = music, attrs \\ %{}) do
    Music.changeset(music, attrs)
  end
end
