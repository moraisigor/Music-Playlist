defmodule MusicPlaylist.Musics.Playlist do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "playlists" do

    field :client_id, :binary_id
    field :music_id, :binary_id

    timestamps()
  end

  @doc false
  def changeset(playlist, attrs) do
    playlist
    |> cast(attrs, [:client_id, :music_id])
    |> validate_required([:client_id, :music_id])
  end
end
