<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * This namespace is applied to your controller routes.
     *
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */
    protected $webNameSpace = 'App\Http\Controllers\Web';
    protected $apiV1NameSpace = 'App\Http\Controllers\Api\V1';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        //

        parent::boot();
    }

    /**
     * Define the routes for the application.
     *
     * @return void
     */
    public function map()
    {
        $this->mapApiV1Routes();

        $this->mapWebRoutes();

        //
    }

    /**
     * Define the "web" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     *
     * @return void
     */
    protected function mapWebRoutes()
    {
        Route::middleware('web')
             ->namespace($this->webNameSpace)
             ->group(base_path('routes/web.php'));
    }

    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @return void
     */
    protected function mapApiV1Routes()
    {
        if (env('API_USE_SUBDOMAIN', false)) {
            Route::domain('api')
                ->prefix('v1')
                ->middleware('api.'.env('API_DOMAIN'))
                ->namespace($this->apiV1NameSpace)
                ->group(base_path('routes/apiV1.php'));
        } else {
            Route::prefix('api/v1')
                ->middleware('api')
                ->namespace($this->apiV1NameSpace)
                ->group(base_path('routes/apiV1.php'));
        }
    }
}
