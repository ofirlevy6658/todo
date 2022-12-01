import WallpaperIcon from '@mui/icons-material/Wallpaper';
import { Box, Skeleton, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { Stack } from '@mui/system';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import produce from 'immer';
import React from 'react';
import { useParams } from 'react-router-dom';
import { getTodos, updateBackground } from '../api/axios';
import { bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9 } from '../assets/backgrounds';
import { BackgroundType } from '../Types';

export const Todos = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { status, data, error, isFetching, isFetchingNextPage, isFetchingPreviousPage, fetchNextPage, fetchPreviousPage, hasNextPage, hasPreviousPage } = useInfiniteQuery(
    ['todos', id],
    () => getTodos({ pageParam: 1, id }),
    {
      getPreviousPageParam: (firstPage, allPages) => (allPages.length > 1 ? allPages.length - 1 : undefined),
      getNextPageParam: (lastPage, allPages) => {
        const limit = 20;
        const lastPageNum = Math.ceil(lastPage.count / limit);
        return lastPageNum > allPages.length ? allPages.length + 1 : undefined;
      },
    }
  );

  const updateBackgroundMutation = useMutation({
    mutationFn: (data: { id: string; bgIndex: number }) => updateBackground(data),
    onSuccess: (resp) => {
      console.log(resp);
    },
  });

  const handleWallpaperClick = (selecetedBgIndex: BackgroundType) => {
    if (!id) return;
    queryClient.setQueryData(['todos', id], (oldData: any) => {
      const newData = produce(oldData, (draftState: any) => {
        draftState.pages[0].list.background = selecetedBgIndex;
      });
      return newData;
    });
    updateBackgroundMutation.mutate({ id, bgIndex: selecetedBgIndex });
  };

  return (
    <>
      {data?.pages[0].list.background ? (
        <Box
          sx={{
            height: '100%',
            maxHeight: 800,
            minHeight: 400,
            width: 850,
            backgroundImage: data?.pages[0].list.background ? `url(${{ 1: bg1, 2: bg2, 3: bg3, 4: bg4, 5: bg5, 6: bg6, 7: bg7, 8: bg8, 9: bg9 }[+data.pages[0].list.background]})` : undefined,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            flexDirection: 'column',
            borderTopLeftRadius: 7,
          }}>
          <Box sx={{ paddingX: 12, paddingY: 8 }}>
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <Box>
                <Typography color="white" variant="h4">
                  {data?.pages[0].list.name}
                </Typography>
              </Box>
              <Box>
                <WallpaperDropDownSelector onWallpaperClick={handleWallpaperClick} />
              </Box>
            </Stack>
          </Box>
        </Box>
      ) : (
        <Skeleton variant="rectangular" sx={{ height: '100%', maxHeight: 800, minHeight: 400, width: 850, bgcolor: 'grey.300' }} />
      )}
    </>
  );
};

type Props = {
  onWallpaperClick: (index: BackgroundType) => void;
};
export default function WallpaperDropDownSelector({ onWallpaperClick }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button id="basic-button" aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
        <WallpaperIcon sx={{ fontSize: 30 }} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        <Box width={170}>
          <Typography ml="8px">Theme</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', width: 150, height: 170, mx: 'auto' }}>
            {[bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9].map((img, i) => (
              <img src={img} key={i} srcSet={img} alt="wallpaper" loading="lazy" onClick={() => onWallpaperClick((i + 1) as BackgroundType)} height={40} width={40} />
            ))}
          </Box>
        </Box>
      </Menu>
    </div>
  );
}
