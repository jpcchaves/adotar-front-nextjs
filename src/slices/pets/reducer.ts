import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResponsePaginated } from "domain/models/ApiResponsePaginated";
import { PetModelMin } from "modules/pets/models/PetModel";

export interface PetsState {
  pets: PetModelMin[] | null;
  pageNo: number;
  totalElements: number;
  totalPages: number;
  pageSize: number;
  last: boolean;
}

interface PayloadPetsPaginated extends PayloadAction<ApiResponsePaginated<PetModelMin>> {}
interface PayloadPets extends PayloadAction<PetModelMin[]> {}

const initialState: PetsState = {
  pets: null,
  pageNo: 0,
  last: true,
  pageSize: 0,
  totalElements: 0,
  totalPages: 0,
};

export const petsSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {
    loadPetsPaginated: (
      state,
      { payload: { totalPages, totalElements, pageNo, pageSize, last, content } }: PayloadPetsPaginated,
    ) => {
      state.pets = content;
      state.pageNo = pageNo;
      state.last = last;
      state.pageSize = pageSize;
      state.totalPages = totalPages;
      state.totalElements = totalElements;
    },
    loadPets: (state, action: PayloadPets) => {
      state.pets = action.payload;
    },
  },
});

export const { loadPetsPaginated, loadPets } = petsSlice.actions;

export default petsSlice.reducer;
