import { AddressRequestDTO } from 'src/domain/DTO/address/AddressRequestDTO'
import { AddressResponseDTO } from 'src/domain/DTO/address/AddressResponseDTO'
import { UpdatePasswordDTO } from 'src/domain/DTO/auth/UpdatePasswordDTO'
import { ContactRequestDTO } from 'src/domain/DTO/contact/ContactRequestDTO'
import { ContactResponseDTO } from 'src/domain/DTO/contact/ContactResponseDTO'
import { ApiMessageResponse } from 'src/domain/models/ApiMessageResponse'
import { HttpMethod, httpRequest } from 'src/utils/http'
import { UserService } from './UserService'

class UserServiceImpl implements UserService {
  updateUserPassword = async (requestDTO: UpdatePasswordDTO): Promise<ApiMessageResponse> => {
    return new Promise((resolve, reject) => {
      httpRequest<UpdatePasswordDTO, ApiMessageResponse>(HttpMethod.PUT, '/v1/auth/update-password', requestDTO)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  createUserAddress = (requestDTO: AddressRequestDTO): Promise<ApiMessageResponse> => {
    return new Promise((resolve, reject) => {
      httpRequest<AddressRequestDTO, ApiMessageResponse>(HttpMethod.POST, '/v1/addresses', requestDTO)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  updateUserAddress = (requestDTO: AddressRequestDTO): Promise<ApiMessageResponse> => {
    return new Promise((resolve, reject) => {
      httpRequest<AddressRequestDTO, ApiMessageResponse>(HttpMethod.PUT, '/v1/addresses', requestDTO)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  getUserAddress = (): Promise<AddressResponseDTO> => {
    return new Promise((resolve, reject) => {
      httpRequest<void, AddressResponseDTO>(HttpMethod.GET, '/v1/addresses')
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  createUserContact = (requestDTO: ContactRequestDTO): Promise<ApiMessageResponse> => {
    return new Promise((resolve, reject) => {
      httpRequest<ContactRequestDTO, ApiMessageResponse>(HttpMethod.POST, '/v1/contacts', requestDTO)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  updateUserContact = (requestDTO: ContactRequestDTO): Promise<ApiMessageResponse> => {
    return new Promise((resolve, reject) => {
      httpRequest<ContactRequestDTO, ApiMessageResponse>(HttpMethod.PUT, '/v1/contacts', requestDTO)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  getUserContact = (): Promise<ContactResponseDTO> => {
    return new Promise((resolve, reject) => {
      httpRequest<void, ContactResponseDTO>(HttpMethod.GET, '/v1/contacts')
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export const userService = new UserServiceImpl()
