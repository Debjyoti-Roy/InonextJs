import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: { hotelSearch: null },
  reducers: {
    setHotelSearchData: (state, action) => {
      state.hotelSearch = action.payload;
    }
  }
});

// Export the action for your components to use
export const { setHotelSearchData } = searchSlice.actions;

// Export the reducer for the store
export default searchSlice.reducer;