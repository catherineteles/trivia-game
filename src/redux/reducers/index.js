import { combineReducers } from 'redux';
import player from './player';
import token from './token';
import questions from './questions';

export default combineReducers({ player, token, questions });
