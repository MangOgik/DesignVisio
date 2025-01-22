import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getDataUTS, deleteDataUTS } from "../../utils/apiuts";
import PlaylistCard from "./PlaylistCard";
import FormInputPlaylist from "./FormInputPlaylist";
import { List, Layout} from "antd";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { Search, NotebookPen, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import PlaylistCardSkeleton from "@/components/skeleton/PlaylistCardSkeleton";

const Playlist = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isOutletVisible, setIsOutletVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [genreFilter, setGenreFilter] = useState({
    music: true,
    song: true,
    movie: true,
    education: true,
    others: true,
  });
  const location = useLocation();
  const isMobile = useIsMobile();

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    getDataPlaylist();
  }, []);

  useEffect(() => {
    setIsOutletVisible(location.pathname !== "/uts");
  }, [location]);

  const getDataPlaylist = () => {
    setIsLoading(true);
    getDataUTS("/api/playlist/23")
      .then((resp) => {
        setIsLoading(false);
        if (resp) {
          setDataSource(resp.datas);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const deleteDataPlaylist = (itemId) => {
    let url = `/api/playlist/${itemId}`;
    let params = new URLSearchParams();
    params.append("id", itemId);
    deleteDataUTS(url, params)
      .then((resp) => {
        if (resp.message === "OK") {
          toast({
            title: "Playlist is deleted",
            description: "Playlist successfully deleted",
          });
          getDataPlaylist();
          setIsOutletVisible(false);
          navigate("/uts");
        } else {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Unable to delete playlist",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Unable to delete playlist",
        });
      });
  };

  const handleSearch = (searchInput) => {
    setSearchText(searchInput.toLowerCase());
  };

  const handleCheckboxChange = (genre, checked) => {
    setGenreFilter((prev) => ({
      ...prev,
      [genre]: checked,
    }));
  };

  const showInputDialog = () => {
    setIsFormVisible(true);
  };

  const closeInputDialog = () => {
    setIsFormVisible(false);
  };

  const closePlaylistDetails = () => {
    setIsOutletVisible(false);
  };

  const onEdit = (item) => {
    setIsEdit(true);
    setSelectedPlaylist(item);
    showInputDialog();
  };

  const onSubmit = () => {
    if (isEdit) {
      setIsEdit(false);
    }
    closeInputDialog();
    closePlaylistDetails();
    getDataPlaylist();
    setSelectedPlaylist(null);
  };

  const onCancel = () => {
    if (isEdit) {
      setIsEdit(false);
    }
    closeInputDialog();
    setSelectedPlaylist(null);
  };

  const dataSourceFiltered = dataSource.filter((item) => {
    const nameMatch = item?.play_name.toLowerCase().includes(searchText);
    const genreMatch =
      (genreFilter.music && item?.play_genre.toLowerCase() === "music") ||
      (genreFilter.song && item?.play_genre.toLowerCase() === "song") ||
      (genreFilter.movie && item?.play_genre.toLowerCase() === "movie") ||
      (genreFilter.education &&
        item?.play_genre.toLowerCase() === "education") ||
      (genreFilter.others && item?.play_genre.toLowerCase() === "others");
    return nameMatch && genreMatch;
  });

  const skeletonData = Array(8).fill({});

  return (
    <Layout className="flex flex-row p-4 h-full bg-color-50 gap-4">
      <div
        className={`h-full ${
          isMobile ? "w-full" : isOutletVisible ? "w-4/6" : "w-full"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="flex gap-2">
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Search playlist..."
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 py-2 border border-gray-400 rounded-md text-color-alternative-black"
            />
            <Search className="pointer-events-none absolute left-2 top-1/2 size-5 -translate-y-1/2 select-none opacity-50 text-color-alternative-black" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-gray-800">
                <Filter />
                Sort By Genre
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36 text-color-alternative-black">
              <DropdownMenuLabel className="text-center">
                Select Genres
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={genreFilter.music}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("music", checked)
                }
              >
                Music
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={genreFilter.song}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("song", checked)
                }
              >
                Song
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={genreFilter.movie}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("movie", checked)
                }
              >
                Movie
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={genreFilter.education}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("education", checked)
                }
              >
                Education
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={genreFilter.others}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("others", checked)
                }
              >
                Others
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Form Input */}
          <Dialog open={isFormVisible}>
            <DialogContent className="p-0">
              <FormInputPlaylist
                isEdit={isEdit}
                item={selectedPlaylist}
                onSubmit={onSubmit}
                onCancel={onCancel}
              ></FormInputPlaylist>
            </DialogContent>
          </Dialog>
          <Button className="bg-gray-800" onClick={showInputDialog}>
            <NotebookPen className="text-white" />
            Add Playlist
          </Button>
        </div>
        <List
          className="my-2 mt-4"
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 4,
            xxl: 6,
          }}
          dataSource={isLoading ? skeletonData : dataSourceFiltered ?? []}
          renderItem={(item, index) => {
            return (
              <List.Item>
                {isLoading ? (
                  <PlaylistCardSkeleton key={index} />
                ) : (
                  <PlaylistCard
                    key={item.id_play}
                    isMobile={isMobile}
                    item={item}
                    searchText={searchText}
                    deleteFunction={deleteDataPlaylist}
                    editFunction={onEdit}
                  />
                )}
              </List.Item>
            );
          }}
        />
      </div>

      {isMobile ? (
        <Sheet open={isOutletVisible}>
          <SheetContent
            side="right"
            className="h-screen sm:w-[350px] p-0 bg-background [&>button]:hidden border-none"
          >
            <Outlet />
          </SheetContent>
        </Sheet>
      ) : (
        <div
          className={`transition-all duration-300 ease-in-out  ${
            isOutletVisible ? "w-2/6 opacity-100" : "w-0 opacity-0"
          }`}
        >
          <Outlet />
        </div>
      )}
    </Layout>
  );
}

export default Playlist;
