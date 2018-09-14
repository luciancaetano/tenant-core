<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Validation\Rule;
use LucianCaetano\TenantCore\Factory\ChainValidator;
use LucianCaetano\TenantCore\Traits\CamelCase;
use LucianCaetano\TenantCore\Traits\HashPassword;
use Silber\Bouncer\Database\HasRolesAndAbilities;

/**
 * @property int $id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon $last_login
 * @property string $name
 * @property string $email
 * @property string $password
 */
class User extends Authenticatable
{
    use Notifiable;
    use HasRolesAndAbilities;
    use CamelCase;
    use HashPassword;

    /**
     * @var array
     */
    protected $dates = [
        'created_at',
        'updated_at',
        'last_login'
    ];
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
}
