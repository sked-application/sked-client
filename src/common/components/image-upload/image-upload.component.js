import React, { useState } from 'react';
import ImageUploading from 'react-images-uploading';

import './image-upload.component.scss';

const ImageUpload = () => {
  const [images, setImages] = useState([]);

  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <div className="image-upload">
      <ImageUploading value={images} onChange={onChange} dataURLKey="data_url">
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className="image-upload__wrapper">
            <button
              type="button"
              className="button button--small button--outline"
              style={isDragging ? { color: 'red' } : null}
              onClick={onImageUpload}
              {...dragProps}
            >
              Adicionar
            </button>
            {imageList.map((image, index) => (
              <div key={index} className="image-upload__item">
                <img
                  className="image-upload__preview"
                  onClick={() => onImageUpdate(index)}
                  src={image.data_url}
                  alt="Imagem do perfil"
                />
                <div className="image-upload__item-btn-wrapper">
                  <button
                    type="button"
                    className="button button--small button--outline"
                    onClick={() => onImageRemove(index)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default ImageUpload;
