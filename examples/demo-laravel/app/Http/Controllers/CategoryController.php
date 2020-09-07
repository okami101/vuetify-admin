<?php

namespace App\Http\Controllers;

use App\Category;
use App\Http\Requests\StoreCategory;
use App\Http\Requests\UpdateCategory;
use App\Http\Requests\MoveCategory;
use App\Http\Resources\Category as CategoryResource;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class CategoryController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Category::class);
    }

    /**
     * Display full listing of the resource as tree format.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function tree()
    {
        return CategoryResource::collection(
            Category::query()
                ->ordered()
                ->get()
                ->toTree()
        );
    }

    /**
     * Display a listing of nodes of specific parent node.
     *
     * @param null $parentId
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function nodes($parentId = null)
    {
        $query = Category::query();

        if ($parentId) {
            $query->where('parent_id', '=', $parentId);
        } else {
            $query->whereNull('parent_id');
        }

        return CategoryResource::collection(
            $query->ordered()->get()
        );
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return CategoryResource::collection(
            QueryBuilder::for(Category::class)
                ->allowedFilters([
                    AllowedFilter::exact('id'),
                    AllowedFilter::exact('type'),
                    'name',
                ])
                ->ordered()
                ->get()
                ->toFlatTree()
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Category  $category
     * @return CategoryResource
     */
    public function show(Category $category)
    {
        return new CategoryResource($category);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return CategoryResource
     */
    public function store(StoreCategory $request)
    {
        $category = Category::create($request->all());

        return new CategoryResource($category);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateCategory $request
     * @param \App\Category $category
     * @return CategoryResource
     */
    public function update(UpdateCategory $request, Category $category)
    {
        $category->update($request->all());

        return new CategoryResource($category);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param MoveCategory $request
     * @param \App\Category $category
     * @return CategoryResource
     */
    public function move(MoveCategory $request, Category $category)
    {
        $category->update($request->only('parent_id'));
        $category->moveToPosition($request->input('position') + 1);

        return new CategoryResource($category);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Category $category
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(Category $category)
    {
        $category->delete();

        return response()->noContent();
    }
}
