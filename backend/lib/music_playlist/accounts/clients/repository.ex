defmodule MusicPlaylist.Accounts.Clients.Client.Repository do
  @moduledoc """
  The Clients context.
  """

  import Ecto.Query, warn: false
  alias MusicPlaylist.Repo

  alias MusicPlaylist.Accounts.Clients.Client

  @doc """
  Returns the list of clients.

  ## Examples

      iex> list_clients()
      [%Client{}, ...]

  """
  def list_all_clients do
    Repo.all(Client)
  end

  @doc """
  Returns the list of clients paginated.

  ## Examples

      iex> list_clients(1, 10)
      [%Plan{}, ...]

  """
  def list_clients(page, clients_per_page) do
    offset = (page - 1) * clients_per_page

    from(client in Client)
    |> limit(^clients_per_page)
    |> offset(^offset)
    |> Repo.all()
  end

  @doc """
  Returns the number of clients.

  ## Examples

      iex> count_clients()
      10

  """
  def count_clients() do
    from(client in Client)
    |> Repo.aggregate(:count, :id)
  end

  @doc """
  Gets a single client.

  Raises `Ecto.NoResultsError` if the Client does not exist.

  ## Examples

      iex> get_client!(123)
      %Client{}

      iex> get_client!(456)
      ** (Ecto.NoResultsError)

  """
  def get_client!(id), do: Repo.get(Client, id)

  @doc """
  Gets a single client by email.

  Raises `Ecto.NoResultsError` if the Client does not exist.

  ## Examples

      iex> get_client_by_email!("user@email.com")
      %Client{}

      iex> get_client_by_email!("non_user@email.com")
      ** (Ecto.NoResultsError)

  """
  def get_client_by_email!(email), do: Repo.get_by!(Client, email: email)

  @doc """
  Creates a client.

  ## Examples

      iex> create_client(%{field: value})
      {:ok, %Client{}}

      iex> create_client(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_client(attrs \\ %{}) do
    %Client{}
    |> Client.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a client.

  ## Examples

      iex> update_client(client, %{field: new_value})
      {:ok, %Client{}}

      iex> update_client(client, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_client(%Client{} = client, attrs) do
    client
    |> Client.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a client.

  ## Examples

      iex> delete_client(client)
      {:ok, %Client{}}

      iex> delete_client(client)
      {:error, %Ecto.Changeset{}}

  """
  def delete_client(%Client{} = client) do
    Repo.delete(client)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking client changes.

  ## Examples

      iex> change_client(client)
      %Ecto.Changeset{data: %Client{}}

  """
  def change_client(%Client{} = client, attrs \\ %{}) do
    Client.changeset(client, attrs)
  end
end
