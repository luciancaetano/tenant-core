<?php

namespace LucianCaetano\TenantCore;

use Illuminate\Support\ServiceProvider as IlluminateServiceProvider;
use LucianCaetano\TenantCore\Api\RequestMacro;

/**
 * ServiceProvider class
 */
class ServiceProvider extends IlluminateServiceProvider
{
    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $this->mergeConfigFrom(
            $this->packagePath('config/config.php'), 'tenantcore'
        );
        $this->publishes([
            $this->packagePath('config/config.php') => config_path('tenantcore.php'),
        ], 'config');
    }

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        RequestMacro::register();
        require_once __DIR__ . '/Helpers/HashIds.php';
    }

    /**
     * Loads a path relative to the package base directory
     *
     * @param string $path
     * @return string
     */
    protected function packagePath($path = '')
    {
        return sprintf("%s/../%s", __DIR__ , $path);
    }
}
