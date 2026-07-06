package com.laioffer.twitch.model;


// imports...


import com.laioffer.twitch.db.entity.ItemEntity;


public record FavoriteRequestBody(
        ItemEntity favorite
) {}
