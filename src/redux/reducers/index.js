import { combineReducers } from 'redux';
import player from './player';
import token from './token';

export default combineReducers({ player, token });
