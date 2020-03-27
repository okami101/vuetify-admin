<?php

namespace App\Console\Commands;

use Illuminate\Console\GeneratorCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputOption;

class ApiCrudMakeCommand extends GeneratorCommand
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $name = 'make:crud';

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

            if ($this->option('mediable')) {
                $this->createSeeder();
            }

            if ($this->option('translatable')) {
                $this->createSeeder();
            }

            parent::handle();
        });
    }

    /**
     * @inheritDoc
     */
    protected function getStub()
    {
        return __DIR__."/stubs/{$this->stubs[$this->type]}.stub";
    }



    /**
     * Get the console command arguments.
     *
     * @return array
     */
    protected function getArguments()
    {
        return [
            ['name', InputArgument::REQUIRED, 'The name of the class'],
        ];
    }

    /**
     * Get the console command options.
     *
     * @return array
     */
    protected function getOptions()
    {
        return [
            ['mediable', 'm', InputOption::VALUE_NONE, 'Create a mediable model'],
            ['translatable', 't', InputOption::VALUE_NONE, 'Create a translatable model'],
        ];
    }
}
