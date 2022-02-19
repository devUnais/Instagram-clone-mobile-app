import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Divider} from 'react-native-elements/dist/divider/Divider';
import like from '../../Images/like.png';
import home from '../../Images/home.png';
import homeBlack from '../../Images/homeBlack.png';
import search from '../../Images/search.png';
import film from '../../Images/film.png';
import filmBlack from '../../Images/filmBlack.png';
import create from '../../Images/create.png';

const Bottambar = () => {
  const [homeImage, setHomeImage] = useState(home);
  const [createImage, setCreateImage] = useState(create);
  const [filmImage, setFilmImage] = useState(film);
  const [searchImage, setSearchImage] = useState(search);

  const changeImage = (img, state) => {
    state(img);
    if (setHomeImage != state) setHomeImage(home);
    if( setCreateImage!= state) setCreateImage(create)
    if( setFilmImage != state) setFilmImage(film)
    if( setSearchImage != state) setSearchImage(search)
  };
  return (
    <>
      <Divider width={1} orientation="vertical" />
      <View style={styles.bottamContainer}>
        <TouchableOpacity onPress={() => changeImage(homeBlack, setHomeImage)}>
          <Image style={styles.bottamBarImages} source={homeImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeImage(create, setCreateImage)}>
          <Image style={styles.bottamBarImages}  source={createImage} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => changeImage(filmBlack, setFilmImage)}>
          <Image style={styles.bottamBarImages}   source={filmImage} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() =>  changeImage(filmBlack, setSearchImage)}>
          <Image style={styles.bottamBarImages}   source={searchImage} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  bottamContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  bottamBarImages: {
    width: 25,
    height: 25,
  },
});

export default Bottambar;
