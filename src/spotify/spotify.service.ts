import { Injectable } from '@nestjs/common';
import { CreateSpotifyDto } from './dto/create-spotify.dto';
import { UpdateSpotifyDto } from './dto/update-spotify.dto';
import { SpotifyConstants } from './spotify.constants';
import SpotifyWebApi = require('spotify-web-api-node');

@Injectable()
export class SpotifyService {
  sdk: SpotifyWebApi;
  cache;
  tokenCache;
  constructor() {
    this.sdk = new SpotifyWebApi({
      clientId: SpotifyConstants.client_id,
      clientSecret: SpotifyConstants.client_secret,
      redirectUri: SpotifyConstants.redirectUri,
      accessToken: 'jhfgkagfkjyeawgfdasfaewfsdc',
    });
  }

  login(state: string) {
    return this.sdk.createAuthorizeURL(SpotifyConstants.scope, state);
  }

  async deneme(req: Request, code: string) {
    console.log(code);
    try {
      await this.sdk.authorizationCodeGrant(code).then((data) => {
        console.log('Expire: ', data.body['expires_in']);
        console.log('Access: ', data.body['access_token']);
        console.log('Refresh: ', data.body['refresh_token']);
        this.sdk.setAccessToken(data.body.access_token);
        this.sdk.setRefreshToken(data.body.refresh_token);
        this.tokenCache = data.body.access_token;
        return data;
      });
      return 'http://localhost:3000/companies?status=true';
    } catch (e) {
      return 'http://localhost:3000/companies?status=false';
    }
  }
  async getToken() {
    try {
      return this.tokenCache;
    } catch (e) {
      return 'hata';
    }
  }

  async pause() {
    try {
      const data = await this.sdk.getMyCurrentPlaybackState();
      console.log(data);
      if (data.body.is_playing) {
        this.sdk.pause().then(() => console.log('success'));
      } else {
        this.sdk.play().then(() => console.log('success'));
      }
    } catch (e) {
      console.log(e);
    }
  }

  async skipNext() {
    try {
      const data = await this.sdk.getMyCurrentPlaybackState();
      console.log(data);
      if (data.body.is_playing) {
        this.sdk.skipToNext().then(() => console.log('success'));
      } else {
        this.sdk.skipToNext().then(() => console.log('success'));
      }
    } catch (e) {
      console.log(e);
    }
  }

  async play() {
    try {
      const data = await this.sdk.getMyCurrentPlaybackState();
      console.log(data);
      if (data.body.is_playing) {
        this.sdk.play().then(() => console.log('success'));
      } else {
        this.sdk.play().then(() => console.log('success'));
      }
    } catch (e) {
      console.log(e);
    }
  }

  async changeAndPlay() {
    try {
      const x = await this.sdk.getMyDevices();
      this.sdk
        .transferMyPlayback([x.body.devices[1].id])
        .then(() => console.log('success'));
      const data = await this.sdk.getMyCurrentPlaybackState();
      console.log(data);
      if (data.body.is_playing) {
        this.sdk.play().then(() => console.log('success'));
      } else {
        this.sdk.play().then(() => console.log('success'));
      }
    } catch (e) {
      console.log(e);
    }
  }

  async getDevices() {
    try {
      const data = await this.sdk.getMyCurrentPlaybackState();
      console.log(data);
      const x = await this.sdk.getMyDevices();
      console.log(x.body.devices.toString());
      return x.body;
    } catch (e) {
      console.log(e);
    }
  }

  async getPlaylist() {
    try {
      const y = await this.sdk.getUserPlaylists();
      console.log(y.body);
      const x = await this.sdk.getPlaylist(y.body.items[0].id);
      return x.body;
    } catch (e) {
      console.log(e);
    }
  }

  async playlist() {
    try {
      let y;
      console.log(this.cache);
      if (this.cache === undefined) {
        y = await this.sdk.getPlaylistTracks('37i9dQZF1DXcBWIGoYBM5M');
        this.cache = y.body.items;
      } else {
        return this.cache;
      }

      return y.body.items;
    } catch (e) {
      console.log(e);
    }
  }

  async addQueTrack(track: string) {
    try {
      const data = await this.sdk.addToQueue(track);
      return data.body;
    } catch (e) {
      console.log(e);
    }
  }

  async getQueue() {
    try {
      const data = await this.sdk.getMyCurrentPlaybackState();
      console.log(data.body);
      return data.body.item;
    } catch (e) {
      console.log(e);
      return '';
    }
  }

  create(createSpotifyDto: CreateSpotifyDto) {
    return 'This action adds a new spotify';
  }

  findAll() {
    return `This action returns all spotify`;
  }

  findOne(id: number) {
    return `This action returns a #${id} spotify`;
  }

  update(id: number, updateSpotifyDto: UpdateSpotifyDto) {
    return `This action updates a #${id} spotify`;
  }

  remove(id: number) {
    return `This action removes a #${id} spotify`;
  }
}
