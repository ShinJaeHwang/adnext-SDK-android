package com.adnexttestproject;

import android.app.ListActivity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.adnexttestproject.banner.ADNextBannerActivity;
import com.adnexttestproject.banner.ADNextBannerDynamicActivity;
import com.adnexttestproject.banner.ADNextBannerDynamicSizeActivity;
import com.adnexttestproject.interstitial.ADNextInterstitialActivity;

import java.util.ArrayList;

public class MainActivity extends ListActivity {


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // 메뉴 리스트 생성 및 셋팅
        ArrayList<String> itemList = new ArrayList<String>();
        itemList.add("Banner");
        itemList.add("Banner (Dynamic)");
        itemList.add("Banner (Dynamic Size)");
        itemList.add("Interstitial");

        // 어댑터 생성
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, itemList);

        this.setListAdapter(adapter);
    }

    // 리스트 클릭 이벤트
    @Override
    protected void onListItemClick(ListView l, View v, int position, long id) {
        super.onListItemClick(l, v, position, id);

        Intent intent = null;
        switch (position) {
            case 0: // banner (Static)
                intent = new Intent(this, ADNextBannerActivity.class);
                startActivity(intent);
                break;

            case 1: // banner (Dynamic)
                intent = new Intent(this, ADNextBannerDynamicActivity.class);
                startActivity(intent);
                break;

            case 2: // banner (Dynamic Size)
                intent = new Intent(this, ADNextBannerDynamicSizeActivity.class);
                startActivity(intent);
                break;

            case 3: // Interstitial
                intent = new Intent(this, ADNextInterstitialActivity.class);
                startActivity(intent);
                break;
        }
    }
}