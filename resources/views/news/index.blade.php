@extends('layout.app')

@section('css')
    <link rel="stylesheet" href="{{ asset('assets/css/pages/menu.css') }}">
@endsection

@section('body')
    <x-page-heading title="Table News" subtitle="View and Manage News Data" />

    <section class="section">

        <!-- Basic Tables start -->
        <div class="card">
            <div class="card-header d-flex align-items-center justify-content-between"><span class="h4">News List</span>
                <a href="" class="btn btn-primary"><i class="bi bi-plus-circle-fill" data-bs-toggle="tooltip"
                        data-bs-placement="top" title="Add Tag"></i>&nbsp;&nbsp;&nbsp;Add
                    News</a>
            </div>
            <div class="card-body" >
                <table class="table" id="table1">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Headline</th>
                            <th>Type</th>
                            <th>Category</th>
                            <th>Tags News</th>
                            <th style="width:15%">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($news as $n)
                            <tr>
                                <td>{{ $n->id }}</td>
                                <td>{{ $n->title }}</td>
                                @if ($n->is_headline  == 1)
                                <td align="center"> <span class="badge bg-success"><i class="bi bi-check-square"></i></span> </td>
                                @else
                                <td></td>
                                @endif
                                <td>{{ ucwords($n->types) }}</td>
                                <td>{{ $n->categories->category}}</td>
                                <td class="d-flex flex-wrap gap-2 rounded"> @foreach ($n->tags as $item)
                                    <span class="badge badge-pill bg-light-success me-1">{{$item->tags}}</span>
                                @endforeach</td>
                                <td>
                                    <a href="" class="btn icon btn-warning"
                                        data-bs-toggle="tooltip" data-bs-placement="top" title="Update User Data"><i
                                            class="bi bi-pencil-square"></i></a>
                                    <button type="button" data-toggle="modal" data-target=""
                                        class="btn icon btn-danger" data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Delete User Data"><i class="bi bi-trash"></i></button>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
                <div  class="d-flex">
                    {{ $news->links() }}
                </div>
            </div>
        </div>
    </section>
@endsection
@section('javascript')
    <script></script>
@endsection
