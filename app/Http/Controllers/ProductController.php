<?php

namespace App\Http\Controllers;

use App\Http\Requests\Products\StoreProductRequest;
use App\Http\Requests\Products\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(
    ): Response
    {
        $products = Product::query()->paginate(10);

        return inertia("products/index",
            compact("products"));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(
    ): Response
    {
        return inertia("products/create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(
        StoreProductRequest $request
    ): RedirectResponse {
        $data = $request->validated();
        Product::query()->create($data);

        return Redirect::route('products.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(
        Product $product
    ): Response {
        return inertia("products/show", compact("product"));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(
        Product $product
    ): Response {
        return inertia("products/edit", compact("product"));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        UpdateProductRequest $request,
        Product $product
    ): RedirectResponse {
        $data = $request->validated();
        $product->update($data);

        return Redirect::route('products.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(
        Product $product
    ): RedirectResponse {
        $product->delete();

        return Redirect::route('products.index');
    }
}
