<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Console\GeneratorCommand;

class ApiCrudMakeCommand extends GeneratorCommand
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:api-crud';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create all necessary server-side resource stubs';

    /**
     * Stubs to generate
     *
     * @var array
     */
    protected $stubs = [
        'Model' => 'model',
        'Migration' => 'migration',
        'Factory' => 'factory',
        'Seeder' => 'seeder',
        'Controller' => 'controller',
        'Policy' => 'policy',
        'StoreRequest' => 'request',
        'UpdateRequest' => 'request',
        'Resource' => 'resource',
    ];

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        collect($this->stubs)->each(function ($name, $type) {
            $this->type = $type;
            //parent::handle();
        });
    }

    /**
     * @inheritDoc
     */
    protected function getStub()
    {
        return __DIR__."/stubs/{$this->stubs[$this->type]}.stub";
    }
}
