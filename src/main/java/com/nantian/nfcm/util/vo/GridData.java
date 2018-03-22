package com.nantian.nfcm.util.vo;

import java.util.List;

public class GridData<T> {
    /**
     * 查询数据的总量
     */
    private long number = 0;
    /**
     * 分页明细数据
     */
    private List<T> data;
    /**
     * 当前页数
     */
    private int page;
    /**
     * 总页数
     */
    private int totalPage;

    public long getNumber() {
        return number;
    }

    public void setNumber(long number) {
        this.number = number;
    }

    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }
}
