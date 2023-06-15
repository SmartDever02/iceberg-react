import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getServerEndPoints } from 'utls/api';

type TAppState = {
  data: NFT[];
  pending: boolean;
  error?: SerializedError;
  currentRequestId?: string;
};

export const initialState: TAppState = {
  data: [],
  pending: false,
};

function getCustomizedUserData(data: NFT[], userData: NFT[]) {
  const nfts = data
    .sort((a, b) => b.value - a.value)
    .map((nft) => ({
      ...nft,
      customized: userData.find((elem) => elem.name === nft.name),
    }));

  return nfts;
}

export const getDataAction = createAsyncThunk('app/data', async () => {
  const data_response = await fetch(getServerEndPoints('/data'));
  const data: { nfts: NFT[] } = await data_response.json();

  const user_data_response = await fetch(getServerEndPoints('/user-data'));
  const user_data: { nfts: NFT[] } = await user_data_response.json();

  const nfts = getCustomizedUserData(data.nfts, user_data.nfts);

  return nfts;
});

export const addInfoAction = createAsyncThunk(
  'app/user/add',
  async (input: { word: string; nft: NFT }) => {
    const response = await fetch(getServerEndPoints('/user-data'), {
      method: 'POST',
      body: JSON.stringify(input),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const userData = await response.json();

    return userData;
  }
);

export const removeInfoAction = createAsyncThunk(
  'app/user/remove',
  async (input: { index: number; nft: NFT }) => {
    const response = await fetch(getServerEndPoints('/user-data/remove'), {
      method: 'DELETE',
      body: JSON.stringify(input),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const userData = await response.json();

    return userData;
  }
);

export const dataSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDataAction.pending, (state: TAppState, action) => {
        if (state.pending) return;
        toast.info('Fetching data from the server...');

        state.pending = true;
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(getDataAction.fulfilled, (state: TAppState, action) => {
        const { requestId } = action.meta;

        if (state.pending && state.currentRequestId === requestId) {
          state.pending = false;
          state.currentRequestId = undefined;
        }

        state.data = action.payload;
      })
      .addCase(getDataAction.rejected, (state: TAppState, action) => {
        const { requestId } = action.meta;
        toast.dismiss();
        toast.error('Failed to fetch data from the server');
        if (state.pending && state.currentRequestId === requestId) {
          state.pending = false;
          state.error = action.error;
          state.currentRequestId = undefined;
        }
      });

    builder
      .addCase(addInfoAction.pending, (state: TAppState, action) => {
        if (state.pending) return;

        toast.info('Adding info...');
        state.pending = true;
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(addInfoAction.fulfilled, (state: TAppState, action) => {
        const { requestId } = action.meta;

        if (state.pending && state.currentRequestId === requestId) {
          state.pending = false;
          state.currentRequestId = undefined;
          toast.dismiss();
        }

        const newState = getCustomizedUserData(state.data, action.payload.nfts);
        state.data = newState;

        return state;
      })
      .addCase(addInfoAction.rejected, (state: TAppState, action) => {
        const { requestId } = action.meta;

        if (state.pending && state.currentRequestId === requestId) {
          state.pending = false;
          state.error = action.error;
          state.currentRequestId = undefined;
          toast.dismiss();
          toast.error('Failed to update info');
        }
      });

    builder
      .addCase(removeInfoAction.pending, (state: TAppState, action) => {
        if (state.pending) return;

        toast.info('Removing info...');
        state.pending = true;
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(removeInfoAction.fulfilled, (state: TAppState, action) => {
        const { requestId } = action.meta;

        if (state.pending && state.currentRequestId === requestId) {
          state.pending = false;
          state.currentRequestId = undefined;
          toast.dismiss();
        }

        const newState = getCustomizedUserData(state.data, action.payload.nfts);
        state.data = newState;

        return state;
      })
      .addCase(removeInfoAction.rejected, (state: TAppState, action) => {
        const { requestId } = action.meta;

        if (state.pending && state.currentRequestId === requestId) {
          state.pending = false;
          state.error = action.error;
          state.currentRequestId = undefined;
          toast.dismiss();
          toast.error('Failed to remove info');
        }
      });
  },
});

export default dataSlice.reducer;
