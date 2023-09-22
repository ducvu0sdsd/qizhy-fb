import { BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.scss'

function App() {

  const [walls, setWalls] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3002/get-wallpapers')
      .then (res => {
        setWalls(res.data.wallpapers)
      })
  }, [])

  const handleInsert = () => {
    const title = document.querySelector('.txt-title').value
    const video = document.querySelector('.txt-video').value
    const type = document.querySelector('.txt-type').value
    const url_hd = document.querySelector('.txt-url-hd').value
    const url_2k = document.querySelector('.txt-url-2k').value
    const url_4k = document.querySelector('.txt-url-4k').value
    const image = document.querySelector('.image-wall').files[0]
    const formData = new FormData();
    formData.append(`image`, image);
    formData.append(`title`, title);
    formData.append(`video`, video);
    formData.append(`type`, type);
    formData.append(`URLHD`, url_hd);
    formData.append(`URL2K`, url_2k);
    formData.append(`URL4K`, url_4k);

    axios.post('http://localhost:3002/insert-wallpapers', formData)
      .then(res => {
        console.log(res.data)
        if (res.data.status == 200) {
          window.location.reload()
        }
      })
  }

  const handleUpdate = () => {
    const id = document.querySelector('.haha').value
    const title = document.querySelector('.txt-title').value
    const type = document.querySelector('.txt-type').value
    const video = document.querySelector('.txt-video').value
    const url_hd = document.querySelector('.txt-url-hd').value
    const url_2k = document.querySelector('.txt-url-2k').value
    const url_4k = document.querySelector('.txt-url-4k').value
    const image = document.querySelector('.image-wall').files[0]
    const formData = new FormData();
    formData.append(`id`, id);
    formData.append(`image`, image);
    formData.append(`title`, title);
    formData.append(`video`, video);
    formData.append(`type`, type);
    formData.append(`URLHD`, url_hd);
    formData.append(`URL2K`, url_2k);
    formData.append(`URL4K`, url_4k);

    axios.post('http://localhost:3002/update-wallpapers', formData)
      .then(res => {
        if (res.data.status == 200) {
          window.location.reload()
        }
      })
  }

  const handleDelete = (id) => {
    axios.post('http://localhost:3002/delete-wallpapers',{id : id})
      .then(res => {
        if (res.data.status == 200) {
          window.location.reload()
        }
      })
  }

  const handleShow = (id) => {
    axios.get('http://localhost:3002/get-wallpaper-by-id?id='+id)
      .then(res => {
        if (res.data.status == 200) {
          document.querySelector('.haha').value = res.data.wallpaper._id
          document.querySelector('.txt-title').value = res.data.wallpaper.title
          document.querySelector('.txt-video').value = res.data.wallpaper.video
          document.querySelector('.txt-type').value = res.data.wallpaper.type
          document.querySelector('.txt-url-hd').value = res.data.wallpaper.URLHD
          document.querySelector('.txt-url-2k').value = res.data.wallpaper.URL2K
          document.querySelector('.txt-url-4k').value = res.data.wallpaper.URL4K
        }
      })
  }

  return (
    <div className="App">
      <div className='col-lg-6 form-input' style={{padding : '0 10px'}}>
          <div className="mt-3"></div>
          <div className="form-group">
              <label className='col-lg-12' style={{textAlign : 'start', fontSize: '15px'}} htmlFor="customInput">Title</label>
              <div className="mt-1"></div>
              <input type="text" name="titleVideo" className="form-control txt-title" placeholder="Enter text"/>
          </div>
          <div className="mt-3"></div>
          <div className="form-group">
              <label className='col-lg-12' style={{textAlign : 'start', fontSize: '15px'}} htmlFor="customInput">Video</label>
              <div className="mt-1"></div>
              <input type="text" name="titleVideo" className="form-control txt-video" placeholder="Enter text"/>
          </div>
          <div className="mt-3"></div>
          <div className="form-group">
              <label className='col-lg-12' style={{textAlign : 'start', fontSize: '15px'}} htmlFor="customInput">Type</label>
              <div className="mt-1"></div>
              <input type="text" name="titleVideo" className="form-control txt-type" placeholder="Enter text"/>
          </div>
          <div className="mt-3"></div>
          <div className="form-group">
              <label className='col-lg-12' style={{textAlign : 'start', fontSize: '15px'}} htmlFor="customInput">URL HD</label>
              <div className="mt-1"></div>
              <input type="text" name="titleVideo" className="form-control txt-url-hd" placeholder="Enter text"/>
          </div>
          <div className="mt-3"></div>
          <div className="form-group">
              <label className='col-lg-12' style={{textAlign : 'start', fontSize: '15px'}} htmlFor="customInput">URL 2K</label>
              <div className="mt-1"></div>
              <input type="text" name="titleVideo" className="form-control txt-url-2k" placeholder="Enter text"/>
          </div>
          <div className="mt-3"></div>
          <div className="form-group">
              <label className='col-lg-12' style={{textAlign : 'start', fontSize: '15px'}} htmlFor="customInput">URL 4K</label>
              <div className="mt-1"></div>
              <input type="text" name="titleVideo" className="form-control txt-url-4k" placeholder="Enter text"/>
          </div>
          <div className="mt-3"></div>
          <div className="form-group">
              <label className='col-lg-12' style={{textAlign : 'start', fontSize: '15px'}} htmlFor="customInput">Image</label>
              <div className="mt-1"></div>
              <input type="file" name="images" className="image-wall" accept=".jpg, .jpeg, .png"/>
          </div>
          <input type='hidden' className='haha'/>
          <div className='btns' style={{marginTop:'20px'}}>
              <button onClick={() => handleInsert()} className="btn btn-success">Thêm</button>
              <button onClick={() => handleUpdate()} className="btn btn-primary">Sửa</button>
          </div>
      </div>
      <div className='col-lg-5 list-game'>
        {walls.map((wall, index) => {
            return <div onClick={() => handleShow(wall._id)} key={index} className='game-item col-lg-12'>
                <div className='col-lg-1 logo'>
                    <img height='100%' src={wall.image} />
                </div>
                <div className='col-lg-10 other'>
                    <div className='title'>
                        <p>{wall.title}</p>
                    </div>
                    <button onClick={() => handleDelete(wall._id)} className="btn btn-danger btn-xoa">Xóa</button>
                </div>
            </div>
        })}
      </div>
    </div>
  );
}

export default App;
