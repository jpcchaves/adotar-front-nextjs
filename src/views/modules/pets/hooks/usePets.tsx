import { ApiResponsePaginated } from 'src/domain/models/ApiResponsePaginated'
import { PetModelMin } from 'src/domain/models/pet/PetModel'
import { HttpMethod, httpRequest } from 'src/utils/http'
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux'

import toast from 'react-hot-toast'
import { savedPetsEndpointV1 } from 'src/configs/routes'
import { PetCreateDTO } from 'src/domain/DTO/pet/PetCreateDTO'
import { ApiMessageResponse } from 'src/domain/models/ApiMessageResponse'
import useNavigation from 'src/hooks/navigation/useNavigation'
import { loadPets, loadPetsPaginated } from 'src/store/pets'
import { updatePetFavorite } from 'src/utils/pet/updatePetFavorite'
import useLoading from '../../../../hooks/loading/useLoading'
import { petService } from '../service/impl/PetServiceImpl'

const FAVORITE = true
const NOT_FAVORITE = false

const ONE_SECOND_IN_MILLIS = 1000

export type toggleSavedPetAction = 'ADD' | 'REMOVE'

const usePets = () => {
  const { navigateBackDelayed } = useNavigation()
  const dispatch = useAppDispatch()
  const { isLoading, setLoading } = useLoading()
  const { pets } = useAppSelector(state => state.pets)

  const getListPets = async (page = 0) => {
    setLoading(true)

    await petService
      .getListPets(page)
      .then(res => {
        handlePetListPagination(res)
      })
      .catch(err => toast.error(err))
      .finally(() => setLoading(false))
  }

  const createPet = async (data: PetCreateDTO) => {
    setLoading(true)

    await petService
      .createPet(data)
      .then(res => {
        toast.success(res.message)
        navigateBackDelayed(ONE_SECOND_IN_MILLIS)
      })
      .catch(err => {
        toast.error(err)
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const getPetById = async (id: string) => {
    setLoading(true)

    await petService
      .getById(id)
      .then(res => console.log(res))
      .catch(err => toast.error(err))
      .finally(() => setLoading(false))
  }

  const addSavedPet = async (petId: string) => {
    await httpRequest<void, ApiMessageResponse>(HttpMethod.POST, `${savedPetsEndpointV1}/${petId}`)
      .then(({ message }) => {
        toast.success(message)
        handleUpdatePetFavorite(petId, FAVORITE)
      })
      .catch(err => {
        toast.error(err)

        // console.log(err);
      })
  }

  const removeSavedPet = async (petId: string) => {
    await httpRequest<void, ApiMessageResponse>(HttpMethod.DELETE, `${savedPetsEndpointV1}/${petId}`)
      .then(({ message }) => {
        toast.success(message)
        handleUpdatePetFavorite(petId, NOT_FAVORITE)
      })
      .catch(err => {
        toast.error(err)

        // console.log(err);
      })
  }

  const toggleSavedPet = (petId: string, action: toggleSavedPetAction) => {
    switch (action) {
      case 'ADD':
        addSavedPet(petId)
        break
      case 'REMOVE':
        removeSavedPet(petId)
        break
      default:
        return
    }
  }

  const handlePetListPagination = (petsPaginated: ApiResponsePaginated<PetModelMin>) => {
    const FIRST_PAGE_NO = 0

    if (pets && petsPaginated.pageNo > FIRST_PAGE_NO) {
      const newData = pets.concat(petsPaginated.content)
      dispatch(
        loadPetsPaginated({
          content: newData,
          last: petsPaginated.last,
          totalElements: petsPaginated.totalElements,
          pageSize: petsPaginated.pageSize,
          pageNo: petsPaginated.pageNo,
          totalPages: petsPaginated.totalPages
        })
      )
    } else {
      dispatch(loadPetsPaginated(petsPaginated))
    }
  }

  const handleUpdatePetFavorite = (petId: string, newFavoriteValue: boolean) => {
    updatePetFavorite(pets!, petId, newFavoriteValue)
    dispatch(loadPets(updatePetFavorite(pets!, petId, newFavoriteValue)))
  }

  return {
    getListPets,
    createPet,
    getPetById,
    addSavedPet,
    removeSavedPet,
    handlePetListPagination,
    toggleSavedPet,
    isLoading
  }
}

export default usePets
