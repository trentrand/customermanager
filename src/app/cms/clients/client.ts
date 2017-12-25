export interface ClientDataId extends ClientData {
  id: string;
}

export interface ClientData {
  id: string
  first_name?: string
  last_name?: string
  address?: string
  primary_phone?: string
  secondary_phone?: string
  veterinarian?: string
  comments?: string
  pets?: [{
    name?: string
    breed?: string
    age?: Number
    sex?: string
    bow?: Boolean
    bandana?: Boolean
    notes?: string
  }],
  pinned: boolean
}
