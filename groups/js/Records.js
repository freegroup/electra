import axios from "axios"

let restEndpoint = "../api/user/group/"
let sortField = "name"

class RecordStore {
  constructor() {
    this.records = null
  }

  findById(id) {
    return axios.get(restEndpoint+encodeURIComponent(id)).then((response) =>{
      return response.data
    })
  }

  list() {
    if (this.records !== null) {
      return Promise.resolve(this.records)
    }

    return axios.get(restEndpoint).then((response) => {
      this.records = response.data
      this.records = this.records.sort((a, b) => a[sortField].localeCompare(b[sortField]))
      return this.records
    })
  }

  join(joinToken) {
    return axios.post(restEndpoint+"join/", {joinToken}).then((response) => {
      this.records.push(response.data)
      this.records = this.records.sort((a, b) => a[sortField].localeCompare(b[sortField]))
      return response.data
    })
  }


  save(record) {
    if (record.id) {
      return axios.put(restEndpoint + encodeURIComponent(record.id), record).then((response) => {
        let internalRecord = this.records.filter((u) => u.id === record.id)[0]
        Object.assign(internalRecord, response.data)
        return internalRecord
      })
    } else {
      return axios.post(restEndpoint, record).then((response) => {
        this.records.push(response.data)
        this.records = this.records.sort((a, b) => a[sortField].localeCompare(b[sortField]))
        return response.data
      })
    }
  }

  addAssignment(group, data) {
      return axios.post(restEndpoint + encodeURIComponent(group.id)+"/assignment", data)
  }

  delAssignment(group, id){
    return axios.delete(restEndpoint + encodeURIComponent(group.id)+"/assignment/"+ encodeURIComponent(id))
  }

  delete(record) {
    if(record.role === "member"){
      return axios.delete(restEndpoint+ "join/" + encodeURIComponent(record.id)).then((response) => {
        this.records = this.records.filter((u) => u.id !== record.id)
        return response.data
      })
    }
    else {
      return axios.delete(restEndpoint + record.id).then((response) => {
        this.records = this.records.filter((u) => u.id !== record.id)
        return response.data
      })
    }
  }
}


let store = new RecordStore()
export default store
